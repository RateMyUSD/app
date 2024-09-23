'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { GRADE_OPTIONS } from '@/constants';
import { cn, getLastXYears } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, ChevronDown, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  professor: z.string(),
  course: z.string(),
  body: z.string(),
  term: z.string(),
  grade: z.string().optional(),
  metrics: z.object({
    clarity: z.number().min(1).max(5).default(1),
    easiness: z.number().min(1).max(5).default(1),
    helpfulness: z.number().min(1).max(5).default(1),
    workload: z.number().min(1).max(5).default(1),
  }),
});

const metrics = [
  {
    name: 'clarity',
    label: 'Clarity',
    helpText:
      'How well the professor explains concepts and communicates ideas.',
  },
  {
    name: 'easiness',
    label: 'Easiness',
    helpText: 'The difficulty level of the class material and grading.',
  },
  {
    name: 'helpfulness',
    label: 'Helpfulness',
    helpText:
      'How willing and effective the professor is in assisting students.',
  },
  {
    name: 'workload',
    label: 'Workload',
    helpText:
      'The amount of assignments, readings, and study required for the course.',
  },
];

export default function ReviewForm({
  professors,
  courses,
}: {
  professors: string[];
  courses: string[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      professor: '',
      course: '',
      body: '',
      term: '',
      grade: '',
      metrics: {
        clarity: 1,
        easiness: 1,
        helpfulness: 1,
        workload: 1,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-4 flex flex-col gap-2 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="professor"
              render={({ field }) => (
                <FormItem className="flex flex-col pb-1 flex-1">
                  <FormLabel>
                    Professor <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between capitalize',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? professors
                                .find((professor) => professor === field.value)
                                ?.replace(/_/g, ' ')
                            : 'Select Professor'}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search professors..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No professor found.</CommandEmpty>
                          <CommandGroup>
                            {professors.map((professor) => (
                              <CommandItem
                                value={professor}
                                key={professor.replace(/_/g, ' ')}
                                onSelect={() => {
                                  form.setValue('professor', professor);
                                }}
                                className="capitalize"
                              >
                                {professor.replace(/_/g, ' ')}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    professor === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="flex flex-col pb-1 flex-1">
                  <FormLabel>
                    Course <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between capitalize',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? courses.find((course) => course === field.value)
                            : 'Select Course'}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="end">
                      <Command>
                        <CommandInput
                          placeholder="Search courses..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No course found.</CommandEmpty>
                          <CommandGroup>
                            {courses.map((course) => (
                              <CommandItem
                                value={course}
                                key={course}
                                onSelect={() => {
                                  form.setValue('course', course);
                                }}
                                className="capitalize"
                              >
                                {course}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    course === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem className="flex flex-col pb-1 flex-1">
                  <FormLabel>
                    Term <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <div className="text-muted-foreground">
                              Select Term...
                            </div>
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getLastXYears(5).map((year) => (
                        <>
                          <SelectItem value={`intersession-${year}`}>
                            Intersession {year}
                          </SelectItem>
                          <SelectItem value={`spring-${year}`}>
                            Spring {year}
                          </SelectItem>
                          <SelectItem value={`summer-${year}`}>
                            Summer {year}
                          </SelectItem>
                          <SelectItem value={`fall-${year}`}>
                            Fall {year}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="flex flex-col pb-1 flex-1">
                  <HoverCard openDelay={200}>
                    <FormLabel className="flex flex-row justify-between">
                      Grade
                      <HoverCardTrigger asChild>
                        <Info size={12} />
                      </HoverCardTrigger>
                    </FormLabel>
                    <HoverCardContent
                      align="start"
                      side="left"
                      className="w-[260px] text-sm"
                    >
                      You are never required to provide a grade, but it can be
                      helpful for other students to understand a professor's
                      grade distributions. Any grade you provide will be kept
                      anonymous and cannot be related back to you.
                    </HoverCardContent>
                  </HoverCard>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <div className="text-muted-foreground">
                              Select Grade...
                            </div>
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GRADE_OPTIONS.map((grade) => (
                        <SelectItem value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {metrics.map((metric) => (
              <FormField
                control={form.control}
                name={`metrics.${metric.name as 'clarity' | 'easiness' | 'helpfulness' | 'workload'}`}
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <FormLabel className="flex flex-row justify-between pb-1">
                          <div>
                            {metric.label}{' '}
                            <span className="text-red-500">*</span>
                          </div>
                          {value} / 5
                        </FormLabel>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="start"
                        side="left"
                        className="w-[260px] text-sm"
                      >
                        {metric.helpText}
                      </HoverCardContent>
                    </HoverCard>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>
                    Review <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write your review..." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Create Review</Button>
      </form>
    </Form>
  );
}
