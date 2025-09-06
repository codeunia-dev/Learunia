import Callout from './Callout';
import CodeBlock from './CodeBlock';
import Tabs, { Tab } from './Tabs';
import CodeComparison from './CodeComparison';
import type { MDXComponents } from 'mdx/types';

// Central MDX components map to be passed to MDXRemote
export const mdxComponents: MDXComponents = {
  // Override standard tags
  pre: (props) => <CodeBlock {...props} />,
  a: (props) => {
    const { className = '', ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...rest}
        className={("text-white hover:text-gray-300 transition-colors " + className).trim()}
      />
    );
  },

  // Custom shortcodes usable directly in MDX
  Callout,
  Tabs,
  Tab,
  CodeComparison,
};

export default mdxComponents;
