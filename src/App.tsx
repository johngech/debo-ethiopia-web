import { AiOutlineSearch } from "react-icons/ai";
import { Input, ThemeSwitch } from "./components/ui";

const App = () => {
  return (
    <div className="m-10">
      <ThemeSwitch />
      <Input
        label="Search"
        placeholder="Search products..."
        leftIcon={<AiOutlineSearch size={18} />}
        rightIcon={<kbd className="kbd kbd-sm">⌘K</kbd>}
        className="my-3"
        errorText="Error message..."
      />
    </div>
  );
};

export default App;
