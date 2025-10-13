"use client"

import Image from 'next/image';
import Content from './content';
import { MarkdownRenderer } from './markdown-renderer';

type Props = {
  content: string;
  image?: string;
};

export function PostBody({ content, image}: Props) {
  return (
    <Content className="pt-4">
      {image && <Image width={300} height={300} src={image} alt="" className="lg:float-right lg:ml-10 mb-6" />}

      <MarkdownRenderer
        content={content}
      />
    </Content>
  );
}
