interface AvatarProps {
  backgroundColor: string;
}

function Avatar({ backgroundColor }: AvatarProps) {
  return <div className="rounded-full w-4 h-4" style={{ backgroundColor }}></div>;
}

export default Avatar;
