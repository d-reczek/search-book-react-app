import { Input } from "@mui/material";
import { useEffect } from "react";
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
    searchBooks();
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
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
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
        onChange={e => handleOnChange(e.target.value)}
      />
    </InputContainer>
  );
};

export default SearchBar;
