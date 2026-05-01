import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Edit2 } from "lucide-react";

export function BirthdayList({ birthdays, onDelete, onEdit, editingId }) {
    return (
        <div className="space-y-3 sm:space-y-4">
            {birthdays.length === 0 && (
                <p className="text-muted-foreground py-8 sm:py-10 tracking-widest uppercase text-xs opacity-50">No records found in database.</p>
            )}
            {birthdays.map(birthday => (
                <div key={birthday.id} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 lg:p-8 bg-transparent border transition-all group ${editingId === birthday.id ? 'border-cyan/50 bg-cyan/5' : 'border-white/5 hover:border-cyan/50'}`}>
                    <div className="flex items-center space-x-4 sm:space-x-8 lg:space-x-12 flex-1">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/10 group-hover:text-cyan transition-colors flex-shrink-0">
                            {birthday.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase tracking-tight group-hover:text-cyan transition-colors truncate">{birthday.name}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-1 sm:mt-2">
                                <p className="text-xs sm:text-sm font-normal text-muted-foreground tracking-wide uppercase opacity-70">
                                    DATE: {birthday.date}
                                </p>
                                {birthday.email && (
                                    <p className="text-xs sm:text-sm font-normal text-cyan/60 tracking-wide lowercase truncate">
                                        {birthday.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-0 ml-auto sm:ml-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(birthday)}
                            className="text-white/20 hover:text-cyan hover:bg-transparent transition-all opacity-0 group-hover:opacity-100 opacity-100 flex-shrink-0"
                        >
                            <Edit2 className="h-5 sm:h-6 w-5 sm:w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(birthday.id)}
                            className="text-white/20 hover:text-red-500 hover:bg-transparent transition-all opacity-0 group-hover:opacity-100 opacity-100 flex-shrink-0"
                        >
                            <Trash2 className="h-5 sm:h-6 w-5 sm:w-6" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}