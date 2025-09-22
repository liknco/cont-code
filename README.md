# Cont Code

### How to Use

1. Save the script as `script.js`.

2. Run the script with Node.js, providing:

   - The **target directory** as the first argument.
   - Optionally, one or more **subdirectories to ignore** as additional arguments.

**Example:**

```bash
node script.js ./project node_modules dist
```

This will:

- Analyze the directory `./project`.
- Ignore the subdirectories `node_modules` and `dist`.

3. The script will output an object with the following fields:

- `files`: number of files.
- `directories`: number of directories.
- `lines`: total number of lines across all files.
- `characters`: total number of characters across all files.
- `words`: total number of words across all files.
