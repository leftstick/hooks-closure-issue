import { IConfig } from "umi-types";

export default {
  hash: true,
  treeShaking: true,
  plugins: [
    [
      "umi-plugin-react",
      {
        dva: false,
        antd: true,
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /hooks\//,
            /components\//,
            /services\//,
            /helpers\//
          ]
        },
        locale: false,
        library: "react",
        dynamicImport: {
          webpackChunkName: true,
          level: 2
        },
        title: false,
        pwa: false,
        hd: false,
        fastClick: false
      }
    ]
  ]
} as IConfig;
