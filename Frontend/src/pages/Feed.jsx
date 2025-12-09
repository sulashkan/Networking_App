import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axiosInstance from "../api/axiousInstance";
import { useDispatch, useSelector } from "react-redux";
import { feedActions } from "../redux/slices/feedSlice";
import { requestActions } from "../redux/slices/requestSlice";
import { Footer } from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

export const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const getFeed = async () => {
      try {
        const response = await axiosInstance.get("/feed");
        console.log("Feed:", response.data);
        dispatch(feedActions.feedData(response.data));
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log("Feed error:", err);
      }
    };

    getFeed();
  }, []);

  const user = useSelector((state) => state.feed);
  console.log("data", user);

  if (!user || user.length === 0) {
  return (
    <div className="flex justify-center items-center text-3xl mt-40">
      No more profiles available
    </div>
  );
}

  if (loading)
    return (
      <div className=" ml-150 mt-60 w-full  text-3xl justify-center items-center">
        Loading...
      </div>
    );

  if (error) return <div>{error.message}</div>;

  const interestedHandler = async (id) => {
    try {
      console.log("id", id);
      const interested = await axiosInstance.post(`/request/interested/${id}`);
      console.log("interested", interested.data);
      dispatch(feedActions.removeUser(id));
      dispatch(requestActions.interestedRequest(interested.data));
      setIsInterested(!isInterested);
    } catch (error) {
      console.log("interested error", error);
    }
  };

  const ignoreHandler = async (id) => {
    try {
      const ignore = await axiosInstance.post(`/request/ignore/${id}`);
      console.log("ignore", ignore.data);
      dispatch(feedActions.removeUser(id));
    } catch (error) {
      console.log("ignore err", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen   w-full ">
      <div className="relative">
        <img
          className="w-full h-150"
          src="https://files.123freevectors.com/wp-content/resized/27628-light-blue-wave-background-design.jpg"
        ></img>
      </div>

      <div className="absolute bottom-40 left-110 flex flex-wrap justify-center  grid-cols-4  gap-3">
        <div className="flex justify-center items-center ml-1 card  w-96 shadow-sm bg-blue-950 mt-8 hover:transition-shadow">
          <figure className="px-10 pt-10">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcBBAUCAwj/xABAEAABAwMBBQQGBwUJAQAAAAABAAIDBAURBhIhMUFRB2FxgRMiMpGhwRQjQlJisdFTcpLC4SQlM0NUdIKishX/xAAbAQEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADYRAAICAQIEAwUHAwUBAAAAAAABAgMEBRESITFBE1FxMmGBobEUIkJSkdHhFSPBMzRD8PEk/9oADAMBAAIRAxEAPwC8UAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEB8aipipozJUSxxRji6RwaB5lZjGU3tFbs8ylGK3b2ODWa3sFKcfThMR+xaXj3jcu+vS8qf4dvXkcs8+iP4t/Q5knaXawSI6Otf3kMH8y6loWQ+so/P9jneq1LomeW9plt+1QVo8Ng/zLL0K/8AMvn+w/q1X5Wb9Lr+wzkB80sBP7WIgDzGVz2aPlw7J+jNsNSol329TvUNzorgzaoaqCoHP0cgOPEclwWU21PacWvU64Wwmt4vc3FrNgQBAEAQBAEAQBAEAQBAEBr1tZTUVM+oq52QxM9p7zgL1CErJcMFuzzOcYLik9kV9fe0SR7nQ2WEMYN30iUZJ8G8vP3KwYuifivfwX7kPfqj6VL4/wAEIra2ruEhkrqiWof1ldnHgOSnaqK6ltCKRFzsnY95vc+C3GsIAgCA9RSPhkEkT3RyD2XsOCPMLxOEZraS3R6i3F7oldk17c6HZjuH9tgHEuOzIB3O5+fvURk6NTZzq+6/l/BIU6lZDlPmvmWPY75QXqnMtDOHFvtxnc9niFXMjFtx5cNi2Jqm+u5bwZ0srnNxlAEAQBAEAQBAEAQHMv8AfKSxURqat2Sd0cbT60jugXRjY1mTZwQ/8NN98KI8Uinr9fa2+1Rmq34jB+rgafUjHd1PerjiYNWLHaC5+fcreRkzvlvLp5HMXWc4WQFgyYLgOYyhgbTeo96AygCyAgPvRVlRQVLKijmfDMzg5h+B6juWq2mF0eGa3RsrslXLii+Za+jtWQ3yMU9RsxV7G+swcJAOJb8xyVQ1DT5Yst484lgw8yN64X7RKAVHHcZQBAEAQBAEAQGpdbhBbKCWsqn7MUQyccT3DvK2VVTtmq4dWa7LI1xc5PkilL9eKm+XF9XVHHKOMHdG3oPn1V3xMWGNVwR+L8ysZF87p8UjnLqNAQBAS3Ruj3XkCtuG3HRA+q1u50p+Q7/coTUdU8D+3Xzl9P5JLDwPF+/P2fqWZR2i20kQjpqCnjaOkYVanfbN7yk38SbjTXFbKKPrJQUT2FrqSncDxBiGD8F5Vti5qT/U9eHDyITqzQsLoX1lji9HM0ZfTD2Xj8PQ93NTWBq84yVd73Xn5evuIzL0+LXHUtn5dit9/Mb1Z001uiEfULJgID3BNLTzsngkdHLGQ5j28QQvFkIzi4yW6Z6jJxe66lyaO1Cy/W7afstq4QGzxjr94dx/VUvPw5Ytu34X0LLiZKvr37rqSBcJ1hAEAQBAEBg8EBVXaTezW3IW2F31FIfrMfbk/pw8cq0aLicFfjS6vp6fyQOpZHHPw10XUhynCMCyYCAbLn+rG0ue47LQOZPBYbSW7MpbvYv+hgZSUsNNE3ZZFGGNHgML57ObnNyfct8IqMUkbC8noIDBGeCAozWsYt+sLnAW7ET5BIzH42gk+8lXXTJ8eJB+X+GV7Op2texywQeCkCPMoYCA6enLvJZLtDWMyYx6szB9ph4/r5LjzsVZNLh37ep0Y17osU18S8YZGSxMkjcHMeNprgdxBVHaaezLSmmt0e1gyEAQBAEBz77cBa7RV1rsH0UZLR1dyHvwt2PS7ro1ruzVfZ4dcp+SKJe58kjpJHbT3kucepO8q+QiorZdCpttttmF7MBAEB6jkfDIyWP243B7c9QcheZRUk4vuZUuF7+Rf1FMKmlhnbwlja8eYBXz2UeCTj5Fvi90mfdYPQQGCUBQ3aFWurtYXAuxswuEDMcg0b/iSrppVahiR9/MhMuW9z9xxKafY9V+8HgVInDZXvzRug5GUOcyhgLGxktfs0ujqywmlkdmSjfsDPNh3t+Y8lUdZo8LI4l0lz+PcsGm28dPC+xMFEkiEAQBAEBB+1SrMVopqRpx9Imy7va0Z/MtU1odfFe5+S+pF6pPapR82VgrWQIQBAEBtWn0P/1aMVTQ+EzsD2ngRtDiufK4vBnw9dmbaeHxI8XTdF9RMbGwRxtDWtGGtAwAFQt23uy2eh7QyEBgrAKV7VY6WLVBbTRMY/0DXzbIxtOJO896t2iubxvvPvyIfO28Xl5EN8VMHGbFPUbJDHezyQ1Tr7o3fPKHOZQwS3sxqzBqJ1OfYqYXDH4m7x8NpQut1KeOp/lf1JLTJ8Nzj5otpVQsAQBAEAQFZdrEhNxoIs7mwudjxI/RWXQY/cnL3og9Wf34ogqsBEhAEAQGD4kHqFgyXToy+Pv1qNRNG2OWKQxPDTnJABz55VIz8T7Ldwp8nzRZ8PI8evi7nfXEdQQGpdqxtuttVXSDLaaF8pHXZBOPgvdVbtsjWure36nmUuGLkfny+XSa9XepuVQwRyTkHYachgDQAPcFe8aiOPSqo80iAtsdk3Jmgt54MoD700+wdmT2eRQ1WQ36G6Dnghz7bHZ0dKYtU20g4zNsnzBC4NSjviz9DpwntkRLvVJLQEAQBAEBV3as3++KM9ac/wDpWfQX/an6/wCCC1b/AFI+hCVPEUEAQBAEBIdG6kdYK1zZm7VFPgSgDJYRwcOveFFang/aYcUfaR3YeX4E9n7LLlbw3qnlkB4ICse1LVTm+l09SAgkN+lyOHIgODW+8ZPl1Vg0fA4tsmfwI7Nv2/tRKyVlIwwgCAckBsU9R6P1HH1eqGqde/MkWlW7epLYB/qGri1B/wDy2egxP9xD1LzVHLSEAQBAEBXXazTn+7qoDdl8ZPuI/Iqw6DPnOHoyG1aPsyK9VkIYIAgCA9RRyTStihY6SR5w1jBkuPcAvMpxiuKT2R6UXJ7Jbsltk0FdqqWKatbFSwhwc5shy9wBzjA4eZUNlazRGLhXzfyJGjTrZNSlyRa43ZyqqifB4ICudfaFuF4uz7nbJIHF8bQ+B5LXEtGMg8OGNxx4qd03VK8evwrF36nBlYsrJccStLlba21T+guVLJTycg9uA7wPA+SsdN9V0eKuW6I2dcoPaS2NVbTwYQBAEBK+zVj6jVtHHjabEHyk9AAfmR71G6tPgxJe/ZG/EqTvUvIvJUwnQgCAIAgIz2hUP03TNS5oy+mInG7gG8ceRKkNKu8LKj7+X6nFn1+JQ/dzKeV0K2FkwEB1NN2Wa+3NtLGdiMDblk+439ei487Lji1cb69joxsd32cPbuXBZbFbrNBsUEAY4j1pHb3u8SqbkZVuQ97Hv9CyU49dK2gjpAAHK0G4ygCAwRlAa9dQUtfTup62COeF3Fkjche67J1y4oPZnmUVJbMp7X+jW6fcytt+263yO2C1xyYnchnoe9WrTNSeSvDs9pfMicrG8P70ehDVMHGYQBAWX2N27akuFzcPZAp2HHg538irmv3exUvX/H7klp8Os/gWkq6SQQBAEAQHmRjZGOY9oLXAgg8wie3NGGk1syi9Q2t1mu9TROB2GuzE77zD7J+Xkr1hZKyKVPv39SrZNPg2uH6HOXWc4WGC0OyqjEVmqKt3tzzbIP4WjH5lyquuWcV6h5L6k/pcNqnLzZN1CkmEAQBAEAQHH1dQNuWmrjTEAudA5zO5zRlvxAXTh2+FkQn7zVfDjraPz0MEZCvj6kAEB6Yx8r2xxML5HkNY0cSTwAWG0lu3yMpN8kfoTStnbY7DSUG4vjbmVw5vO93xVEy8h5F0rPP6diepr8OtROuuY2hAEAQBAEBE9fadN3twqaVuaymBLWgb5G82+PT+qlNLzfs9vDL2ZfI4M/G8aG8eqKk4buYVwXMroQFi9ml/pYaJ1pqpGxSNkLoS84Dwd5HiDlVnWsSzxPGit13JrTMmPB4UnzLA2s8AoElz0gCAIAgME4RgjetNS0dktNQ10rDWyxubBAHesSRjJHIDOV24OHZk2rZcl1Zz33Rri9+pQ43ADorxvuQZlAWH2VaYNTUi+VsZEMJIpWuG57ub/AcB3+Cr+tZqS+zwfN9f2JDCo3fiP4FsAYGFWiUMoAgCAIAgCAwUBXWu9IODpLrao85y6ogaP+zR+Y81YNL1Pbam1+jIfPwm/wC5WvVFfKyEMYIBGCNyA2KW+Xq0HNBcqlkQ/wApz9tg/wCLsgeS5bcHGu9uC+n0O2nLsjy4jsU3adqGIfWCin/fiI/IhcUtExpdG0dizrV12N2PtYuY/wAS2Ujj+GRw/VaXoNXabNi1CXeJ6d2sXD7NqpR4yuPyWP6DX3m/0H9Ql+U1J+1K/SAiKnoYRyIjc4/Fy2x0LHXWTf8A30PLz7OyRxbjrPUVwBbLdJomHi2n+q+IwfiuurTMWvmob+vM0yybZdWcFznOcXOc5zjxcTkldySS2Robb5sLJglGiNIz6iqmzztdFbInfWSDcZD91vzPJRmo6jHFjwx5yfy97OrGxna930LupYIqWCOCCNscUbQ1jGjAaBwAVOlKUm5Se7ZMpJLZH2WDIQBAEAQBAEAQGCMoCEar0LHXl9badiGqJy+InDJPDofh+amcDVpU7Qt5x8+6IzL09Wffr5P5FbVlJUUNS6mrIXwzN4seMbuo6jvVnquhbHjg90Qk65QlwyWzPgQCth4NKpg2PWYPV5josnRCe/JnwQ2mEAQBAZaHOcGMaXOccBrRkk9AFhtLmxt2LB0j2b1FW5lXfwYKfcRSg+vJ+990d3HwUDm6zGK4KOb8/wBiQowm+dnQtWmpoqWCOCnjZHFG0NYxgwGgdFWpSlOTlJ7tkmkorZH2WDIQBAEAQBAEAQBAEAO9AadxtlFc4PQ19MyZnIOG8eB4jyWyq6ymXFW9ma7KoWLhmt0Qm7dm8RLn2irMZ5RT72/xDePcVN0a7NcrY7+9fsRlulRfOuW3qRqs0Vf6Un+xCcdYHhw+OD8FKV6tiz/Ft6o4Z6fkR7b+hHq2wXWncSbXXBv+2fu+C6o5dEuk1+qPUa7ekov9DXbaLo//AA7XXu/dpZD8ln7TQv8Akj+qPfhT/KzpUei9R1hAZapowftTYjHx3rns1PEh1nv6czZHFul2JNauyurkcH3aviiZzjp8vd/EQAPcVHX69BLamO/r+x0wwH+Nk+sOlrRYhmgpQJSMGeQ7Uh8zw8sKFyc2/J/1JcvLsdtdFdfso7IGFyG4ygCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAID//Z"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2>ID : {user[0]._id}</h2>
            <h2 className="card-title">{user[0].name}</h2>
            <p>{user[0].profession}</p>
            <div className="flex gap-1">
              <p>Skills : </p>
              {user[0].skills.map((i) => (
                <div className="">{i},</div>
              ))}
            </div>
            <div className="card-actions">
              <button
                onClick={() => interestedHandler(user[0]._id)}
                className="btn btn-primary"
              >
                Interested
              </button>
              <button
                onClick={() => ignoreHandler(user[0]._id)}
                className="btn  bg-red-500  border-none hover:bg-red-600 hover:duration-500"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full  absolute p-1 bottom-0  mt-25">
        
        <Footer />
      </div>
    </div>
  );
};
