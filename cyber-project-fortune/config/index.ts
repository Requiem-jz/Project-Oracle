import path from 'path'

const config = {
  projectName: '赛博项目排盘',
  date: '2024-3-4',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-framework-react'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain: any) {
      chain.merge({
        module: {
          rule: {
            mycss: {
              test: /\.css$/,
              oneOf: [
                {
                  use: [
                    {
                      loader: 'postcss-loader',
                      options: {
                        postcssOptions: {
                          plugins: [
                            require('tailwindcss'),
                            require('autoprefixer')
                          ]
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      })
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  }
}

export default function (merge: any) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
