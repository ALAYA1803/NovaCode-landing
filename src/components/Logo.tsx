export const Logo = ({ colorAccent = '#D97757', colorText = '#FFFFFF', ...props }) => (
  <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Isotipo N */}
    <rect x="5" y="10" width="6" height="20" rx="1" fill={colorText} />
    <path d="M11 10 L29 30" stroke={colorAccent} strokeWidth="6" strokeLinecap="round" />
    <rect x="29" y="10" width="6" height="20" rx="1" fill={colorText} />
    <circle cx="20" cy="20" r="2.5" fill={colorAccent} /> {/** Nova point */}

    {/* Texto de la Marca */}
    <text x="50" y="28" fontFamily="'Inter', sans-serif" fontSize="24" fill={colorText}>
      <tspan fontWeight="700">Nova</tspan>
      <tspan fontWeight="300">Code</tspan>
    </text>
  </svg>
);