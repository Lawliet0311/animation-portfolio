import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PageHeader from "@/components/page-header"
import ContactCard from "@/components/contact-card"
import SectionTransition from "@/components/section-transition"

export default function Contact() {
  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text">
      <PageHeader title="联系方式" description="开启合作新篇章" />

      <section className="py-10 md:py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
            <SectionTransition direction="right" className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 elegant-gradient-text">保持联系</h2>
                <div className="w-20 h-[1px] elegant-divider mb-4 md:mb-6"></div>
                <p className="text-sm sm:text-base text-elegant-muted">
                  无论您有项目合作需求、咨询问题还是其他事宜，都欢迎随时与我联系。我将尽快回复您的信息。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <ContactCard icon="Mail" title="邮箱" value="378565185@QQ.COM" copyable />

                <ContactCard icon="Phone" title="电话" value="18750781915" copyable />

                <ContactCard
                  icon="MessageSquare"
                  title="微信"
                  value="Moritake_Mashiro"
                  qrCode="/images/wechat-qr.jpg?height=200&width=200"
                />

                <ContactCard
                  icon="MessageCircle"
                  title="QQ"
                  value="378565185"
                  qrCode="/images/qq-qr.jpg?height=200&width=200"
                />
              </div>
            </SectionTransition>

            <SectionTransition direction="left">
              <div className="bg-elegant-card p-5 sm:p-6 md:p-8 rounded-md elegant-border">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 elegant-gradient-text">发送消息</h2>
                <form className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-elegant-muted">
                        姓名
                      </label>
                      <Input
                        id="name"
                        placeholder="您的姓名"
                        className="bg-elegant-bg border-elegant-border focus-visible:ring-elegant-accent1 focus-visible:border-elegant-accent1"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-elegant-muted">
                        邮箱
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="您的邮箱"
                        className="bg-elegant-bg border-elegant-border focus-visible:ring-elegant-accent1 focus-visible:border-elegant-accent1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm text-elegant-muted">
                      公司 (可选)
                    </label>
                    <Input
                      id="company"
                      placeholder="您的公司"
                      className="bg-elegant-bg border-elegant-border focus-visible:ring-elegant-accent1 focus-visible:border-elegant-accent1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm text-elegant-muted">
                      主题
                    </label>
                    <Input
                      id="subject"
                      placeholder="消息主题"
                      className="bg-elegant-bg border-elegant-border focus-visible:ring-elegant-accent1 focus-visible:border-elegant-accent1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-elegant-muted">
                      消息内容
                    </label>
                    <Textarea
                      id="message"
                      placeholder="请输入您的消息内容..."
                      rows={4}
                      className="bg-elegant-bg border-elegant-border focus-visible:ring-elegant-accent1 focus-visible:border-elegant-accent1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-elegant-accent3 text-white hover:bg-elegant-accent3/90 transition-all duration-300 elegant-btn-hover"
                  >
                    发送消息
                  </Button>
                </form>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </div>
  )
}
