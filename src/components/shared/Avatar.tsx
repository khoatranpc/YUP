interface Props {
  src?: string;
}

const Avatar = ({ src }: Props) => {
  return <img style={{ width: 40, height: 40, borderRadius: '50%' }} src={src} alt="" />;
};

export default Avatar;
