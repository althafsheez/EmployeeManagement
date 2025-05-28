"use client"

import type React from "react"
import { API_BASE } from "@/lib/api"
import { useEffect, useState } from "react"
import { Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { error } from "console"

  //Sample employee data
//   const initialEmployees = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     department: "Engineering",
//     position: "Senior Developer",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     department: "Marketing",
//     position: "Marketing Manager",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Robert Johnson",
//     email: "robert.johnson@example.com",
//     department: "HR",
//     position: "HR Specialist",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     email: "emily.davis@example.com",
//     department: "Finance",
//     position: "Financial Analyst",
//     status: "On Leave",
//   },
//   {
//     id: 5,
//     name: "Michael Wilson",
//     email: "michael.wilson@example.com",
//     department: "Engineering",
//     position: "QA Engineer",
//     status: "Active",
//   },
// //]

type Employee = {
  id: number
  name:string
  email: string
  department: string
  position: string
}

export default function EmployeeList() {
  const [employee, setEmployee] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
  })

  useEffect(()=>{
    fetch(`${API_BASE}/employees`)
    .then((res)=>res.json())
    .then((data)=>{
      const formatted=data.map((emp:any)=>
      ({id:emp.id,
        name:`${emp.first_name} ${emp.last_name}`,
        email:emp.email,
        department:emp.department,
        position:emp.position
      }))
      setEmployee(formatted)
    })
    .catch((error) => {
      console.error("Failed to fetch employees:", error)
    })
  },[])
    
  
  // Filter employees based on search term
  const filteredEmployees = employee.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // Add new employee
  const handleAddEmployee = async () => {
    try{
      const response= await fetch(`{API_BASE}/api`,{
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body:JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed to add employee")
      const newEmployee = await response.json()
      setEmployee((prev)=>[...prev,newEmployee])
      setIsAddDialogOpen(false)
      resetForm()
    }catch(error){
      console.error(error)
    }
  }

 
  // Edit employee
  // 📍 Place at the top of your component file (but inside the component if you're using hooks)

function splitName(fullName: string) {
  const parts = fullName.trim().split(" ")
  const first_name = parts[0]
  const last_name = parts.slice(1).join(" ") || ""  // Handles single names
  return { first_name, last_name }
}

const handleEditEmployee = async () => {
  if (!currentEmployee) return;

  const nameParts = formData.name.trim().split(" ");
  if (nameParts.length < 2) {
    alert("Please enter both first name and last name.");  // ✅ Or use a toast/snackbar
    return;
  }

  try {
    const { first_name, last_name } = splitName(formData.name);

    const updatedData = {
      first_name,
      last_name,
      email: formData.email,
      department: formData.department,
      position: formData.position,
    };

    const response = await fetch(`${API_BASE}/employees/${currentEmployee.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      let errorText;
      try {
        const errorJson = await response.json();
        errorText = JSON.stringify(errorJson, null, 2);
      } catch (e) {
        errorText = await response.text();
      }
      throw new Error(`Failed to update employee:\n${errorText}`);
    }

    const updatedEmployee = await response.json();

    const formatted = {
      id: updatedEmployee.id,
      name: `${updatedEmployee.first_name} ${updatedEmployee.last_name}`,
      email: updatedEmployee.email,
      department: updatedEmployee.department,
      position: updatedEmployee.position,
    };

    setEmployee((prev) =>
      prev.map((emp) => (emp.id === formatted.id ? formatted : emp))
    );

    setIsEditDialogOpen(false);
    resetForm();
  } catch (error) {
    console.error(error);
  }
};



  // Delete employee
  const handleDeleteEmployee = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE}/employees/${id}/`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete employee")

    setEmployee((prev) => prev.filter((emp) => emp.id !== id))
  } catch (error) {
    console.error(error)
  }}

  // Open edit dialog and set current employee
  const openEditDialog = (employee: Employee) => {
    setCurrentEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
    })
    setIsEditDialogOpen(true)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      position: "",

    })
    setCurrentEmployee(null)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Employees</CardTitle>
          <CardDescription>Manage your employees</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Add Employee</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the details of the new employee.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Engineering"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Developer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Position</TableHead>
                
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                    <TableCell className="hidden md:table-cell">{employee.position}</TableCell>
                    
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(employee)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete {employee.name}'s record. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteEmployee(employee.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update the employee's information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-department">Department</Label>
              <Input id="edit-department" name="department" value={formData.department} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input id="edit-position" name="position" value={formData.position} onChange={handleInputChange} />
            </div>
            
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEmployee}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )

}