export default ({
  src,
  webp,
  className,
  ...props
}) => {
  if (!webp) {
    return <img className={className} src={src} {...props} />;
  }

  if (!src) {
    return <img className={className} src={webp} {...props} />;
  }

  return (
    <picture className={className}>
      <source srcset={webp} type='image/webp' />
      <img src={src} {...props} />
    </picture>
  );
};