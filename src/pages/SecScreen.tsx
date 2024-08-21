import assets from "@/assets"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const SecScreen = () => {
    return (
        <>
            <div className=" p-2">
                <div className="text-[28px] text-secondary mb-5">
                    Gallery
                </div>
                <div className="bg-white  rounded-[20px]">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="w-full justify-start p-0">
                            <TabsTrigger value="account" className="min-w-[184px] rounded-t-[20px] h-auto">3d renderers</TabsTrigger>
                            <TabsTrigger value="password" className="min-w-[184px] shadow-none">blueprints</TabsTrigger>
                            <TabsTrigger value="report" className="min-w-[184px] shadow-none">Approvals & Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="m-0">

                            <div className="flex justify-start flex-wrap gap-0 p-5 ">
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel1} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel2} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel3} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel4} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel5} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel6} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel7} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel8} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel9} alt="model" />
                                </div>
                                <div className="basis-[20%] my-4">
                                    <img src={assets.images.hmodel10} alt="model" />
                                </div>
                            </div>

                        </TabsContent>
                        <TabsContent value="password" className="m-0">Change your password here.</TabsContent>
                        <TabsContent value="report" className="m-0">Change your password here.</TabsContent>
                    </Tabs>

                </div>
            </div>
        </>
    )
}

export default SecScreen