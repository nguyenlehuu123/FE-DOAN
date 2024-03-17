# nguyen-web-app

___

## 📦About

___
web app is a Client Side Rendering Webapp UI which designed and developed as an ecormmerce microservice
system.

## 🚀Install

___

- [ ] [Clone code from gitlab](http://54.238.84.183/itec_new-iplat/product/src/apps/iplat-web-app)
- [ ] [Install NodeJS version 14+ (recommend lasted LTS version)](https://nodejs.org/en/download)
- [ ] Install dependency and run project with the following command:

```
npm install
npm run dev
```

## 🎁Technologies Used

___

- [ ] [VueJS 3](https://vuejs.org/guide/introduction.html)
- [ ] [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
- [ ] [Vuetify 3](https://vuetifyjs.com/en/introduction/why-vuetify/)
- [ ] [Pinia](https://pinia.vuejs.org/ssr/nuxt.html)
- [ ] [Eslint](https://eslint.org/docs/latest/use/getting-started)
- [ ] [VueJs Toast](https://s4l1h.github.io/vue-toastr/)
- [ ] [Vue Date Picker](https://vue3datepicker.com/)

## 📁Directory Structure
___

```bash
.
├── ...
│
├── /assests                # Used to add all the website's assets that the build tool (webpack or Vite) will process (Stylesheet, Fonts,
│                           # Images that wont be served from /public).
│
├── /common                 # Where you put all your common js function.
│
├── /components             # Where you put all your Vue components which can then be imported inside your pages or other components.
│   │
│   ├── /icons              # Where you put all image icon component (svg image need to wrap in vue component) 
│   │    
│   └── /ui                 # Where you put all UI vue component element 
│
├── /constant               # Folder used to put all constants.
│
├── /layouts                #Layouts are placed in the layouts/ directory and will be automatically loaded via asynchronous import when 
│                           # used.
│
├── /middleware             # Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for
│                           # extracting code that you want to run before navigating to a particular route.
│
├── /pages                  # Pages are Vue components and can have any valid extension that Nuxt supports (by default .vue, .js, .jsx,
│                           # .mjs, .ts or .tsx). Nuxt will automatically create a route for every page in your ~/pages/ directory.
│
├── /plugins                # Nuxt automatically reads the files in your plugins directory and loads them at the creation of the Vue
│                           # application.
│
├── /public                 # The public/ directory is directly served at the server root and contains public files that have to keep their 
│                           # names (e.g. robots.txt) or likely won't change (e.g. favicon.ico).
│
├── /README_IMAGE           # Where you put all image which used for readme.md
│                
├── /repository             # Where you put all API caller function. Each file is used for a controller, each folder is use for a service 
│          
├── /store                  # Folder which used for put all store (using Pinia)
│
├── app.vue                 # Main page of vuejs. This page will wrap all page inside
│
├── babel.config.js         # Config babel
│              
├── jest.config.js          # Config jest
│                  
├── nuxt.config.ts          # Config nuxt
│                  
├── package.json            # Define dependency
│                  
├── tsconfig.json           # Config typescript
│                  
└── ...
```

This project is following recommended directory structure of NUXT
3 [(detail)](https://nuxt.com/docs/guide/directory-structure/nuxt)

## ⚠️Rule

<custom-component v-bind="$attrs">
  <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
    <slot :name="slot" v-bind="{...scope}" />
  </template>
</custom-component>
```

❗Every new style must define as a class in /assets/global-style.scss

## 📒Component Guide

___

### 📄 Data Table (iplat-data-table)

### Props
