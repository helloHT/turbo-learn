# Turborepo starter

This is an official npm starter turborepo.

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `midway-server`: a [Midwayjs](http://www.midwayjs.org/) server
- `math-helpers`: 自定义的一个工具包，将在`midway-server`中引用

### Script

- `dev_mode`: 将`packages`中的包的 package.json 文件的 main 与 types 字段指向 ts 文件。用于本地开发
- `build_mode`: 将`packages`中的包的 package.json 文件的 main 与 types 字段指向 js 文件。用于构建部署

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm run dev
```

### 部署 midway-server 服务

在根目录下运行

```shell
docker build -f ./apps/midway-server/Dockerfile -t midway-server:1.0.0 .
```
