import { AiOutlineSearch } from "react-icons/ai";
import { Input, Select, ThemeSwitch } from "./components/ui";

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
      <div className="max-w-50">
        <Select
          options={[
            { label: "Select...", value: "" },
            { label: "A", value: 1 },
            { label: "B", value: 2 },
            { label: "C", value: 3 },
            { label: "D", value: 4 },
          ]}
        />
      </div>
    </div>
  );
};

export default App;
