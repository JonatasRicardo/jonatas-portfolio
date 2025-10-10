"use client"

import Content from './content';
import { MarkdownRenderer } from './markdown-renderer';

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <Content className="pt-4">
      {/* <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <MarkdownRenderer
        content={content}
      />
    </Content>
  );
}
