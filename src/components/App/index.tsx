import React, {
  FC,
  useCallback,
  useState,
  ChangeEvent,
  useEffect
} from "react";
import { Route, Link, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

export const App: FC<{}> = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">to top</Link>
          </li>
          <li>
            <Link to="/page1">to page 1</Link>
          </li>
        </ul>
      </nav>
      <Route
        exact
        path="/"
        component={() => <Page title="top" description="this is top page" />}
      />
      <Route
        exact
        path="/page1"
        component={() => <Page title="page 1" description="this is page 1" />}
      />
    </div>
  );
};

interface IProps {
  title: string;
  description: string;
}

const Page: FC<IProps> = ({ title, description }) => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location.pathname, location.search]);

  const increment = useCallback(() => {
    ReactGA.event({
      category: "Test",
      action: "Click increment button"
    });
  }, []);

  const [input, setInput] = useState(0);
  const inputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (!text) return;
      Number.isInteger(Number(text));
      console.log(text);
      setInput(Number(text));
    },
    [input]
  );
  const sendInput = useCallback(() => {
    ReactGA.event({
      category: "Social",
      action: "Rated an App",
      label: "hoge",
      value: input
    });
  }, [input]);

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={increment}>increment button</button>
      <hr />
      <input type="number" onChange={inputChange} value={input} />
      <button onClick={sendInput}>send your rate</button>
    </div>
  );
};
