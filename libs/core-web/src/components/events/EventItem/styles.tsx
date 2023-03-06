import styled from 'styled-components';
import Image from 'next/image';

export const Item = styled.li`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 1px 12px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Lato';

  @media (min-width: 768px) {
    flex-direction: row;
    font-family: 'Lato';
  }
`;

export const Photo = styled(Image)`
  width: 100%;
  object-fit: cover;
  height: 10rem;

  @media (min-width: 768px) {
    width: 40%;
    height: 14rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 1rem;
  text-align: center;

  h2 {
    margin: 0.5rem 0;
    font-family: 'Lato';
  }

  .date,
  .address {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  time {
    color: #666666;
    font-weight: bold;
  }

  address {
    margin: 0.5rem 0;
    color: #666666;
    white-space: pre;
  }

  @media (min-width: 768px) {
    width: 60%;
    padding: 0;
    text-align: left;

    h2 {
      margin: 1rem 0;
      font-family: 'Lato';
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  a {
    display: block;

    span {
      vertical-align: middle;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const IconSpan = styled.span`
  margin-left: 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
