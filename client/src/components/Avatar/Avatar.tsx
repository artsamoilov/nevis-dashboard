import * as S from "./Avatar.styled.ts";

interface AvatarProps {
  name: string;
  imageUrl?: string;
}

export const Avatar = ({ name, imageUrl }: AvatarProps) => {
  return (
    <S.AvatarWrapper>
      {imageUrl ? (
        <img src={imageUrl} alt={name} width={20} height={20} />
      ) : (
        <span>{name.charAt(0).toUpperCase()}</span>
      )}
    </S.AvatarWrapper>
  );
};
