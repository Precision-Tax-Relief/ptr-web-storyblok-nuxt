# Storyblok CLI

1. [Install CLI](https://github.com/storyblok/storyblok-cli)
2. [Get personal access token](https://app.storyblok.com/#/me/account?tab=token)
3. Copy `.env.sample` -> `.env` and add personal access token
4. Run `storyblok login --token <PERSONAL_ACCESS_TOKEN> --region us`

# Launching Dev Environment

## HTTPS Proxy

Install `mkcert` and generate a certificate for `localhost`:

### MacOS
```bash
brew install mkcert
mkcert -install
mkcert localhost
```

### Windows Powershell
For Windows users use this [guide.](https://www.storyblok.com/faq/setup-dev-server-https-windows)

Install Choco 
https://chocolatey.org/install

Run powershell as admin
```
choco install mkcert // install mkcert
mkcert --version // check the mkcert version
choco install nvm
```

Run powershell as regular user
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser // Allow script execution so nvm can install node
nvm install lts // or whatever version is being used in the project
nvm use lts
npm install -g local-ssl-proxy
```
Run powershell as admin
```
npm run proxy
```


# References

[Vue Style Guide](https://vuejs.org/style-guide/)

[Icon Reference](https://icon-sets.iconify.design/)

[Nuxt-Image](https://image.nuxtjs.org/components/nuxt-img)

[Headless UI](https://headlessui.com/)

# Storyblok Notes

You can't name a StoryBlok component the same as a Vue Component.

# Generate Storyblok Types

Make sure storyblok is installed globally:

```bash
npm i storyblok -g
storyblok login --token [YOUR_TOKEN] --region us
```

Pull Storyblok components and generate types:

```bash
storyblok pull-components --space=[SPACE_ID]
yarn run generate-sb-types
```

## NuxtPicture with Storyblok example:

```html
<NuxtPicture src="https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp" loading="lazy" />
```

This automatically generates the following:

```html
<picture>
  <source
    type="image/webp"
    sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1536px"
    srcset="
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/320x0/filters:format(webp)   320w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/640x0/filters:format(webp)   640w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/768x0/filters:format(webp)   768w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1024x0/filters:format(webp) 1024w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1280x0/filters:format(webp) 1280w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1536x0/filters:format(webp) 1536w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1536x0/filters:format(webp) 1536w
    "
  />
  <img
    loading="lazy"
    data-nuxt-pic=""
    src="https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1536x0/filters:format(png)"
    sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1536px"
    srcset="
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/320x0/filters:format(png)   320w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/640x0/filters:format(png)   640w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/768x0/filters:format(png)   768w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1024x0/filters:format(png) 1024w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1280x0/filters:format(png) 1280w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1536x0/filters:format(png) 1536w,
      https://a-us.storyblok.com/f/1014492/1024x682/37b43bbe44/parade-2021-rear-view.webp/m/1536x0/filters:format(png) 1536w
    "
  />
</picture>
```
