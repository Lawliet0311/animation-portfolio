"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Phone, MessageSquare, MessageCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ContactCardProps {
  icon: string
  title: string
  value: string
  copyable?: boolean
  qrCode?: string
}

export default function ContactCard({ icon, title, value, copyable, qrCode }: ContactCardProps) {
  const [copied, setCopied] = useState(false)

  const getIcon = (): JSX.Element => {
    const props = { className: "h-5 w-5 sm:h-6 sm:w-6 text-elegant-accent1" }

    switch (icon) {
      case "Mail":
        return <Mail {...props} />
      case "Phone":
        return <Phone {...props} />
      case "MessageSquare":
        return <MessageSquare {...props} />
      case "MessageCircle":
        return <MessageCircle {...props} />
      default:
        return <Mail {...props} />
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-elegant-card p-4 sm:p-6 rounded-md border border-elegant-border hover:border-elegant-accent1/30 transition-all duration-300 flex flex-col elegant-card-hover h-full">
      <div className="flex items-center mb-3 sm:mb-4">
        {getIcon()}
        <h3 className="ml-2 sm:ml-3 font-medium text-sm sm:text-base">{title}</h3>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-elegant-muted text-sm sm:text-base truncate max-w-[70%]">{value}</p>

        {copyable && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-7 w-7 sm:h-8 sm:w-8 text-elegant-muted hover:text-elegant-accent1 hover:bg-transparent"
          >
            {copied ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span className="sr-only">复制{title}</span>
          </Button>
        )}

        {qrCode && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-elegant-border hover:bg-elegant-card hover:text-elegant-accent1 h-7 px-2 sm:h-8 sm:px-3"
              >
                查看二维码
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-elegant-card border-elegant-border max-w-xs sm:max-w-md">
              <div className="flex flex-col items-center p-4">
                <h3 className="text-base sm:text-lg font-medium mb-4 elegant-gradient-text">{title}二维码</h3>
                <div className="bg-white p-3 sm:p-4 rounded-md">
                  <Image src={qrCode || "/placeholder.svg"} alt={`${title}二维码`} width={200} height={200} />
                </div>
                <p className="mt-3 sm:mt-4 text-elegant-muted text-sm sm:text-base">{value}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
