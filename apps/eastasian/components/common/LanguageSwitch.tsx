import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@resume/redux/feature';
import { useSelectLanguage } from '@resume/redux/selector';
import { COLOR } from '@resume/libs/styles';

const StyledLanguageSwitch = styled.div`
  display: flex;
  background: ${COLOR['gray']};
  border-radius: 12px;
  overflow: hidden;
  .language-switch {
    color: ${COLOR['secondary']};
    outline: none;
    border: none;
    cursor: pointer;
  }
  .language-switch__active {
    color: ${COLOR['light']};
    background: ${COLOR['primary']};
    cursor: default;
  }
`;

export const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const lang = useSelectLanguage();
  const onClick = (ln: typeof lang) => () => {
    dispatch(setLanguage(ln));
  };
  return (
    <StyledLanguageSwitch>
      <button
        className={`language-switch ${
          lang === 'en' && 'language-switch__active'
        }`}
        onClick={onClick('en')}
      >
        en
      </button>
      <button
        className={`language-switch ${
          lang === 'ja' && 'language-switch__active'
        }`}
        onClick={onClick('ja')}
      >
        ja
      </button>
    </StyledLanguageSwitch>
  );
};
