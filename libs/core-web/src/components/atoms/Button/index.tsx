import React from 'react';
import * as S from './styles';

export function Button(props: any) {
  if (props.link) {
    return <S.ButtonLink href={props.link}>{props.children}</S.ButtonLink>;
  }

  return (
    <S.ButtonSubmit onClick={props.onClick}>{props.children}</S.ButtonSubmit>
  );
}
