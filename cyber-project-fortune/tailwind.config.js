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
          jade: '#4ade80',
          purple: '#8b00ff',
          red: '#ff3366',
          yellow: '#ca8a04'
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
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(74, 222, 128, 0.5), 0 0 40px rgba(74, 222, 128, 0.3)',
        'glow-green-strong': '0 0 30px rgba(74, 222, 128, 0.6), 0 0 60px rgba(74, 222, 128, 0.3)',
        'glow-green-intense': '0 0 40px rgba(74, 222, 128, 0.8), 0 0 80px rgba(74, 222, 128, 0.4)',
        'glow-yellow': '0 0 10px rgba(202, 138, 4, 0.5)',
        'glow-yellow-strong': '0 0 15px rgba(202, 138, 4, 0.3)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)',
        'glow-gold-strong': '0 0 30px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)',
        'glow-gold-text': '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
        'glow-white': '0 0 10px rgba(255, 255, 255, 0.3)',
        'glow-white-weak': '0 0 5px rgba(255, 255, 255, 0.2)',
        'glow-red': '0 0 8px rgba(255, 51, 102, 0.5)',
        'inset-green': 'inset 0 0 20px rgba(74, 222, 128, 0.05)',
        'inset-yellow': 'inset 0 0 20px rgba(202, 138, 4, 0.05)',
        'inset-gold': 'inset 0 0 20px rgba(255, 215, 0, 0.05)',
        'inset-dark': 'inset 0 0 15px rgba(0, 0, 0, 0.5)',
        'card': 'inset 0 0 15px rgba(0, 0, 0, 0.5), 0 0 10px rgba(74, 222, 128, 0.1)',
        'input': '0 0 15px rgba(74, 222, 128, 0.3), inset 0 0 20px rgba(74, 222, 128, 0.05)',
        'input-yellow': '0 0 15px rgba(202, 138, 4, 0.3), inset 0 0 20px rgba(202, 138, 4, 0.05)',
        'button': '0 0 30px rgba(74, 222, 128, 0.6), 0 0 60px rgba(74, 222, 128, 0.3), inset 0 0 30px rgba(74, 222, 128, 0.1)',
        'button-hover': '0 0 40px rgba(74, 222, 128, 0.8), 0 0 80px rgba(74, 222, 128, 0.4), inset 0 0 40px rgba(74, 222, 128, 0.2)',
        'bottom-btn': '0 0 20px rgba(74, 222, 128, 0.3), inset 0 0 15px rgba(74, 222, 128, 0.1)'
      },
      dropShadow: {
        'glow-green': '0 0 10px rgba(74, 222, 128, 0.5)',
        'glow-green-strong': '0 0 20px rgba(74, 222, 128, 0.8)',
        'glow-yellow': '0 0 10px rgba(202, 138, 4, 0.5)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
        'glow-white': '0 0 10px rgba(255, 255, 255, 0.3)',
        'glow-white-weak': '0 0 5px rgba(255, 255, 255, 0.2)',
        'glow-red': '0 0 8px rgba(255, 51, 102, 0.5)'
      }
    }
  },
  plugins: []
}
