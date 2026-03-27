// Request mediator

type State = "OPEN" | "CLOSED" | "HALF_OPEN";

type RequestSubscriber = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

class RequestManager {
  private static instance: RequestManager;
  private state: State = "CLOSED";
  private _isRefreshing = false;
  public get isRefreshing() {
    return this._isRefreshing;
  }

  private _subscribers: RequestSubscriber[] = [];
  public get subscribers(): RequestSubscriber[] {
    return this._subscribers;
  }
  public set subscribers(value: RequestSubscriber[]) {
    this._subscribers = value;
  }
  private lastErrorTime: number = 0;
  private failureCount: number = 0;

  private halfOpenTrial = false;

  private readonly BASE_COOLDOWN = 5000; // 5s
  private readonly MAX_COOLDOWN = 30000; // 30s
  private readonly REFRESH_TIMEOUT = 10000; // 10s

  private constructor() {}

  public static getInstance(): RequestManager {
    if (!RequestManager.instance)
      RequestManager.instance = new RequestManager();
    return RequestManager.instance;
  }

  // 🔹 Dynamic cooldown (exponential backoff)
  private getCoolDown(): number {
    return Math.min(
      this.BASE_COOLDOWN * 2 ** this.failureCount,
      this.MAX_COOLDOWN,
    );
  }

  // Circuit Breaker Check
  public canRequest(): boolean {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastErrorTime > this.getCoolDown()) {
        this.state = "HALF_OPEN";
        return true;
      }
      return false;
    }
    if (this.state === "HALF_OPEN") {
      if (!this.halfOpenTrial) {
        this.halfOpenTrial = true;
        return true; // allow one test request
      }
      return false;
    }
    return true;
  }

  public tripBreaker() {
    this.state = "OPEN";
    this.failureCount++;
    this.lastErrorTime = Date.now();
  }
  // 🔹 Reset breaker on success or logout
  public reset() {
    this.state = "CLOSED";
    this._isRefreshing = false;
    this._subscribers = [];
    this.failureCount = 0;
    this.halfOpenTrial = false;
  }

  // 🔹 Notify all waiting requests (success)
  private notifySuccess(token: string) {
    this._subscribers.forEach((sub) => {
      sub.resolve(token);
    });
    this._subscribers = [];
  }
  // 🔹 Notify all waiting requests (failure)
  private notifyFailure(error: unknown) {
    this._subscribers.forEach((sub) => {
      sub.reject(error);
    });
    this._subscribers = [];
  }

  // Concurrent Refresh Management
  public async handleRefresh(
    refreshFn: () => Promise<string>,
  ): Promise<string> {
    // If already refreshing → queue requests
    if (this.isRefreshing) {
      console.log("Refreshing...");
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Refresh timeout"));
        }, this.REFRESH_TIMEOUT);

        this._subscribers.push({
          resolve: (token) => {
            clearTimeout(timeout);
            resolve(token);
          },
          reject: (err) => {
            clearTimeout(timeout);
            reject(err);
          },
        });
      });
    }

    // Start refresh
    this._isRefreshing = true;

    try {
      const token = await refreshFn();

      //  Success → reset breaker
      this.state = "CLOSED";
      this.failureCount = 0;
      this.halfOpenTrial = false;

      // Notify all queued requests
      this.notifySuccess(token);

      return token;
    } catch (error) {
      //  Failure → trip breaker
      this.tripBreaker();

      // Reject all queued requests
      this.notifyFailure(error);

      throw error;
    } finally {
      this._isRefreshing = false;
    }
  }
}

export const requestManager = RequestManager.getInstance();
