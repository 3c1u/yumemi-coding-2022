import styled from '~/vendor/@emotion/styled'

export const AppButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  background: #129cff;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(18, 156, 255, 0.2);
  }
`
