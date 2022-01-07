# placeit README

A vscode extension to quickly generate a placeholder image. Create a plain javascript object with the params, select it and run the extension to generate
a placeholder image with those attributes.

Supported params: 
```
interface Params {
    width: string; // '200px'
    height: string; // '200px'
    background?: string; // 'red' -- defaults to 'black'
    text?: string; // 'whatever text you need to write'
    textColor?: string; // 'blue' -- defaults to 'white'
    fontFamily?: string; // defaults to 'sans-serif'
    fontSize?: string; // default '16px'
    fontWeight?: string; // default 'regular'
}
```

