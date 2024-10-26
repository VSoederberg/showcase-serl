import React from 'react'
import { Listbox } from '@headlessui/react'

interface Type {
  name: string
  selected: boolean
}

interface TypeFilterProps {
  types: Type[]
  onChange: (_selectedTypes: Type[]) => void
  className?: string
}

const TypeFilter: React.FC<TypeFilterProps> = ({ types, onChange }) => {
  const handleTypeChange = (type: Type) => {
    const updatedTypes = types.map((t) =>
      t.name === type.name ? { ...t, selected: !t.selected } : t
    )
    onChange(updatedTypes)
  }

  return (
    <div className='relative mr-2 inline-block text-left'>
      <Listbox as='div' className='mt-2'>
        {({ open }) => (
          <>
            <div className='w-56'>
              <Listbox.Button className='mr-2 block flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none'>
                <span>Select Types</span>
                {/* Downward arrow icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-2 h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Listbox.Button>
            </div>
            <Listbox.Options
              className={`absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg ${
                open ? 'block' : 'hidden'
              }`}
            >
              {types.map((type) => (
                <Listbox.Option
                  key={type.name}
                  value={type}
                  className={`relative cursor-default select-none p-2 ${
                    type.selected ? 'bg-blue-500 text-white' : 'text-gray-900'
                  }`}
                  onClick={() => handleTypeChange(type)}
                >
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={type.selected}
                      onChange={() => handleTypeChange(type)}
                      className='mr-2'
                    />
                    <label>{type.name}</label>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default TypeFilter
