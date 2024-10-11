import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';

interface Tag {
  name: string;
  selected: boolean;
}

interface TagFilterProps {
  tags: Tag[];
  onChange: (selectedTags: Tag[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, onChange }) => {
  const handleTagChange = (tag: Tag) => {
    const updatedTags = tags.map(t =>
      t.name === tag.name ? { ...t, selected: !t.selected } : t
    );
    onChange(updatedTags);
  };

  return (
    <div className="relative inline-block text-left">
      <Listbox as="div" className="mt-2">
        {({ open }) => (
          <>
            <div>
              <Listbox.Button className="bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                Select Tags
              </Listbox.Button>
            </div>
            <Listbox.Options
              className={`absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg ${
                open ? 'block' : 'hidden'
              }`}
            >
              {tags.map(tag => (
                <Listbox.Option
                  key={tag.name}
                  value={tag}
                  className={`cursor-default select-none relative p-2 ${
                    tag.selected ? 'bg-blue-500 text-white' : 'text-gray-900'
                  }`}
                  onClick={() => handleTagChange(tag)}
                >
                  <span className="block">{tag.name}</span>
                  {tag.selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <CheckIcon className="w-5 h-5 mr-2" />
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default TagFilter;
