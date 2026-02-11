
import React from 'react'
import { cn } from '../../lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
    {
        variants: {
            variant: {
                default: "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                solid: "bg-indigo-600 hover:bg-indigo-500 text-white border-transparent shadow-lg shadow-indigo-600/20",
                ghost: "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5 text-gray-400 hover:text-white",
            },
            size: {
                default: "px-7 py-2.5 text-sm",
                sm: "px-4 py-1.5 text-xs",
                lg: "px-10 py-3.5 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

// Fix: Use type intersection instead of interface extension for ButtonProps.
// Interface extension can fail to correctly merge complex utility types like VariantProps from class-variance-authority.
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & { neon?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {/* Visual neon effect spans */}
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-indigo-500 via-indigo-600 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-indigo-500 via-indigo-600 to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
