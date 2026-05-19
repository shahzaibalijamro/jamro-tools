type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1300px] px-4 min-[700px]:px-9 ${className}`}>
      {children}
    </div>
  );
}
