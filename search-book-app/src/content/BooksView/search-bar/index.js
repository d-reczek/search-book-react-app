import { Input } from "@mui/material";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 15px auto;
`;

const SearchBar = ({ setInputValue, searchBooks, inputValue }) => {
  const handleOnChange = value => {
    setInputValue(value.toLowerCase());
    // searchBooks();
  };

  return (
    <InputContainer>
      <Input
        sx={{
          width: "100%",
          borderRadius: "4px",
          background: "#fff",
          border: "1px solid #E9E9E9",
          fontSize: "16px",
          padding: "8px 46px 8px 16px",
          margin: "0px 10px",
          color: "#585858",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          "::placeholder": {
            color: "#898989",
          },
          "&&&:before": {
            border: "none",
          },
          "&&&:after": {
            border: "none",
          },
          ":hover": {
            boxShadow:
              "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
          },
          ":focus": {
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
        type="text"
        placeholder="Search book"
        inputProps={{
          style: {
            padding: "0",
          },
        }}
        autoFocus
        defaultValue={inputValue}
        onChange={e => handleOnChange(e.target.value)}
      />
    </InputContainer>
  );
};

export default SearchBar;
