// "use client"

import { motion } from 'motion/react';
import Content from './content';

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <Content className="pt-4">
      <div
        // className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Content>
  );
}
