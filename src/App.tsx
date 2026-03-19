import { ThemeSwitch, Button } from "./components/ui";

const App = () => {
  return (
    <div>
      <h1 className="text-2xl text-red-500">Hello react</h1>
      <Button isLoading={true} variant={"primary"}>Button</Button>
      <ThemeSwitch />
    </div>
  );
};

export default App;
