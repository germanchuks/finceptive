import styled from "styled-components";

export const DivStyled = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 1rem;
  width: 100%;
  height: auto;
  border-radius: 10px;
  font-size: smaller;
  border: 1.5px solid #3D2B31;
`

export const LabelStyled = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: 'black';
  margin-top: 0.5rem;

`

export const ButtonStyled = styled.button`
  background-color: #4caf50;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  transition: all .2s ease-in-out;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
  &:hover {
    background-color: #7F94B5;
  }
`

export const AlertStyled = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`