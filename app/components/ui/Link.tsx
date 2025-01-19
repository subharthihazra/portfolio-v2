export default function Link({
  children,
  newtab = true,
  ...props
}: {
  children: React.ReactNode;
  newtab?: boolean;
  [key: string]: unknown;
}) {
  return (
    <a {...(newtab && { target: "_blank" })} {...props}>
      {children}
    </a>
  );
}
