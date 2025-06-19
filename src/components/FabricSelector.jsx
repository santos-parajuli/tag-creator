const FabricSelector = ({ fabrics, onSelect, disabled }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredFabrics = fabrics.filter(fabric => 
    `${fabric.fabric} ${fabric.color}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' disabled={disabled} className='w-[300px] justify-between'>
          {disabled ? 'Maximum selected' : 'Select fabric...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput 
            placeholder='Search fabric...' 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No fabric found.</CommandEmpty>
            <CommandGroup heading='Fabrics'>
              {filteredFabrics.map((fabric, idx) => {
                const label = `${fabric.fabric} - ${fabric.color}`;
                return (
                  <CommandItem
                    key={idx}
                    value={label}
                    onSelect={() => {
                      onSelect(fabric);
                      setOpen(false);
                      setSearch('');
                    }}>
                    {label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
