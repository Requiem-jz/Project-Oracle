/// <reference types="@tarojs/taro" />

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare const defineAppConfig: <T>(config: T) => T
declare const definePageConfig: <T>(config: T) => T
