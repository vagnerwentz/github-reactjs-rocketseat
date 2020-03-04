import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row; /* Garantindo que o input e o button fique um ao lado do outro */

  input {
    flex: 1; /* Ocupar todo espaço possível */
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px; /* 10px em cima em baixo e 15px na esquerda e direita */
    border-radius: 4px;
    font-size: 16px;

    transition: border 0.25s ease-out;
  }
`;

// Criando a animação
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px; /* Mais alto o valor, mais distante o input fica*/
  border-radius: 4px; /* Formato da borda */

  /* Somando as 3 propriedades abaixo, ele faz que todo o conteúdo
    fique centralizado */
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;

export const DualRepo = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
`;
