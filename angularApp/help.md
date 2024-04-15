
## If you want to create new angular project then follow this step to use pure html:

1. Paste the folder "htmltoangular" inside this folder "src/app/"
2. Paste the folder "js" inside this folder "src/assets/js/"
3. Go to "tsconfig.json" file and in "CompilerOptions" object `{"allowJs":true} ` add this key
4. Go to "src/app-routing.module.ts" file and add this `{path:"html-to-angular", component:HtmltoangularComponent}` route inside @routes array
5. Go to "src/app.component.html" file and add this `
    click here to view
    <a [routerlink]="['/html-to-angular']">
        pure html page
    </a>
`@router-outlet inside component
6. Now you can start the server and see the output