module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#00f5ff',
          secondary: '#ff00ff',
          accent: '#ffff00',
          dark: '#0a0a0f',
          darker: '#050508',
          gold: '#ffd700',
          jade: '#00ff88',
          purple: '#8b00ff',
          red: '#ff3366'
        }
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        chinese: ['Noto Sans SC', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.8), 0 0 80px rgba(0, 245, 255, 0.5)' 
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    }
  },
  plugins: []
}
