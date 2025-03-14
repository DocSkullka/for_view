import styled from 'styled-components';
import QRCode from 'react-qr-code';

const QRCodeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const QRCodeStyled = styled(QRCode)`
  width: 100vw;
  height: 100vw;
  padding: 5px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 12px;
`;

export const QRCodeComponent = ({ value, width }) => {
  return (
    <QRCodeWrapper>
      <QRCodeStyled
        value={value || ''}
        style={{
          height: 'auto',
          maxWidth: '100%',
          width: width,
        }}
      />
    </QRCodeWrapper>
  );
};
