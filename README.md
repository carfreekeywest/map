=======
# Car Free Key West Map
Map for Car Free Key West

## Setup
```bash
npm install
```
**Note:** If your not interested in publishing to a Github Page then remove `git-directory-deploy` from the `package.json` file.

## Develop
```bash
npm run dev

## Build
```bash
npm run build
```

## Deploy to Github Page
Be sure you have installed `git-directory-deploy`.

1. Create a Github Page branch, `git branch gh-pages`.
2. Push the branch, `git push origin gh-pages`.
3. Deploy code to Github Page, `npm run ghpage`.
4. Go check it out at:
    * User/Organization pages: `http://{username}.github.io`
    * Project pages: `http://{username}.github.io/{repo}`
