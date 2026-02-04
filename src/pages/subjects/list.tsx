import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DEPARTMENTS, DEPARTMENTS_OPTIONS } from "@/components/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { Subject } from "@/types";
import { ColumnDef } from "@tanstack/table-core";
const SubjectsList = () => {
    const [SearchQuery, setSearchQuery] = useState('');
    const [selectDepartment, setSelectDepartment] = useState('all');

    const departmentFilter = selectDepartment === 'all' ? [] :[{ field: 'department', operator: 'eq' as const, value: selectDepartment }];
    const searchFilter = SearchQuery ? [{ field: 'name', operator: 'contains' as const, value: SearchQuery }] : [];

    const subjectTable = useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(() => [
        {
            id: 'code', 
            accessorKey: 'code', 
            size: 100, 
            header: () => <p className="column-title ml-2">Code</p>,
            cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
            id: 'name', 
            accessorKey: 'name', 
            size: 200,
            header: () => <p className="column-title">Name</p>, 
            cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
            filterFn: 'includesString',
        },
        {
            id: 'department',
            accessorKey: 'department',
            size: 150,
            header: () => <p className="column-title">Department</p>,
            cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
        },
        {
            id: 'description',
            accessorKey: 'description',
            size: 300,
            header: () => <p className="column-title">Description</p>,
            cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
        }
           
        ], [
        ]),

        refineCoreProps: {
        resource: 'subjects',
        pagination: {
            pageSize: 10,
            mode: 'server',
        },
        filters: {
            permanent: [
            ...departmentFilter, ...searchFilter]
        },
        sorters: {
            initial: [
            {
                field: 'id', order: 'desc'
            }
            ]
        },
        },
    });

    return (
        <ListView>  
            <Breadcrumb />
            <h1 className="page-title">Subjects List</h1>
           <div className="intro-row">
            <p>Quick access metrics and management tools.</p>
            <div className="action-row">
                <div className="search-field">
                    <Search className="search-icon"/>
                    <input 
                        type="text" placeholder="Search by name ..."
                        className="pl-10 w-full search-input"
                        value={SearchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">      
                    <Select value={selectDepartment} onValueChange={setSelectDepartment}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {DEPARTMENTS_OPTIONS.map((dept) => (
                                <SelectItem value={dept.value} key={dept.value}>{dept.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <CreateButton/>
                </div>
            </div>
            </div>
            <DataTable table={subjectTable}/>
        </ListView>
    )
}

export default SubjectsList;