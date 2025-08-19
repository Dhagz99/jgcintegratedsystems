type BadgeProps = {
    label: string;
    type: 'default' | 'success' | 'warning' | 'danger'; // You can add more types as needed
  };
  
  export default function BadgeComponent({ label, type }: BadgeProps) {
    const getBadgeColor = (type: string) => {
      switch (type) {
        case 'success':
          return 'bg-green-600';
        case 'warning':
          return 'bg-yellow-500';
        case 'danger':
          return 'bg-red-600';
        default:
          return 'bg-gray-400';
      }
    };
  
    return (
      <div>
        <button
          className={`${getBadgeColor(type)} text-white p-1 font-bold rounded-sm text-xs`}
        >
          {label}
        </button>
      </div>
    );
  }
  