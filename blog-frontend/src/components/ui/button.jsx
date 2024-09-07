export function Button({ variant, children, ...props }) {
    const baseStyle = 'px-4 py-2 font-semibold text-white rounded';
    const variants = {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-gray-500 hover:bg-gray-700',
    };
  
    return (
      <button className={`${baseStyle} ${variants[variant]}`} {...props}>
        {children}
      </button>
    );
  }
  