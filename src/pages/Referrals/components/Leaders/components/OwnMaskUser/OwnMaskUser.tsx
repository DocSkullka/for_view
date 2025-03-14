type Props = {
    imageURL?: string;
    username: string;
  };
  
  export function OwnMaskUser({ imageURL, username }: Props) {
    return (
      <div>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_14_3598" fill="white">
            <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z"/>
          </mask>
          <path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="white"/>
          <path d="M0 12C0 4.8203 5.8203 -1 13 -1H51C58.1797 -1 64 4.8203 64 12C64 5.92487 58.6274 1 52 1H12C5.37258 1 0 5.92487 0 12ZM64 52C64 59.1797 58.1797 65 51 65H13C5.8203 65 0 59.1797 0 52C0 58.0751 5.37258 63 12 63H52C58.6274 63 64 58.0751 64 52ZM0 64V0V64ZM64 0V64V0Z" fill="white" mask="url(#path-1-inside-1_14_3598)"/>
          {imageURL ? (
            <image href={imageURL} x="2" y="2" width="60" height="60" />
          ) : (
            <text x="32" y="32" textAnchor="middle" dominantBaseline="middle" fill="#101010" fontSize="36" fontWeight="500">
              {`${username[0] || ''}${username[1] || ''}`}
            </text>
          )}
        </svg>
      </div>
    );
  }
  