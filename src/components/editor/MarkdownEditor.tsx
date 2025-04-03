
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange: (markdown: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ initialValue = '', onChange }) => {
  const [markdown, setMarkdown] = useState(initialValue);

  useEffect(() => {
    onChange(markdown);
  }, [markdown, onChange]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-secondary/40 border-b border-border p-2 rounded-t-md flex items-center">
        <h3 className="text-sm font-medium">Markdown</h3>
      </div>
      <Textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="flex-1 resize-none rounded-t-none font-mono text-sm p-4 h-full"
        placeholder="# Your Presentation Title

## Slide 1

- Write in **Markdown**
- Get beautiful slides
- Enhanced by AI

---

## Slide 2

```js
// Code highlighting works
function hello() {
  return 'world';
}
```"
      />
    </div>
  );
};

export default MarkdownEditor;
