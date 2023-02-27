import styled from '~/vendor/@emotion/styled'

export const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 1.5rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`
