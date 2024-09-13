--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-26 17:43:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17011)
-- Name: clubs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clubs (
    club_id integer NOT NULL,
    club_code character varying(100),
    name character varying(100),
    domestic_competition_id character varying(100),
    total_market_value character varying(100),
    squad_size integer,
    average_age numeric(4,1),
    foreigners_number integer,
    foreigners_percentage numeric(4,1),
    national_team_players integer,
    stadium_name character varying(100),
    stadium_seats integer,
    net_transfer_record character varying(100),
    coach_name character varying(100),
    last_season integer,
    url character varying(255)
);


ALTER TABLE public.clubs OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17026)
-- Name: competitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitions (
    competition_id character varying(50) NOT NULL,
    competition_code character varying(100),
    name character varying(100),
    sub_type character varying(100),
    type character varying(100),
    country_id integer,
    country_name character varying(50),
    domestic_league_code character varying(50),
    confederation character varying(50),
    url character varying(255)
);


ALTER TABLE public.competitions OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17037)
-- Name: game_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_events (
    game_event_id character varying(50) NOT NULL,
    date date,
    game_id integer,
    minute integer,
    type character varying(50),
    club_id integer,
    player_id integer,
    description character varying(100),
    player_in_id integer,
    player_assist_id integer
);


ALTER TABLE public.game_events OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17053)
-- Name: game_lineups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_lineups (
    game_lineups_id character varying(50) NOT NULL,
    game_id integer,
    club_id integer,
    type character varying(50),
    number character varying(32),
    player_id character varying(32),
    player_name character varying(100),
    team_captain boolean,
    "position" character varying(50)
);


ALTER TABLE public.game_lineups OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17179)
-- Name: player_valuations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.player_valuations (
    player_id bigint,
    last_season integer,
    datetime timestamp without time zone,
    date character varying,
    dateweek character varying,
    market_value_in_eur integer,
    n integer,
    current_club_id integer,
    player_club_domestic_competition_id character varying,
    id bigint NOT NULL
);


ALTER TABLE public.player_valuations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17185)
-- Name: player_valuations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.player_valuations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.player_valuations_id_seq OWNER TO postgres;

--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 221
-- Name: player_valuations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.player_valuations_id_seq OWNED BY public.player_valuations.id;


--
-- TOC entry 219 (class 1259 OID 17120)
-- Name: players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players (
    player_id integer NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    name character varying(100),
    last_season integer,
    current_club_id integer,
    player_code character varying(100),
    country_of_birth character varying(100),
    city_of_birth character varying(100),
    country_of_citizenship character varying(100),
    date_of_birth date,
    sub_position character varying(50),
    "position" character varying(50),
    foot character varying(10),
    height_in_cm integer,
    market_value_in_eur character varying(100),
    highest_market_value_in_eur integer,
    contract_expiration_date date,
    agent_name character varying(50),
    image_url character varying(255),
    url character varying(255),
    current_club_domestic_competition_id character varying(10),
    current_club_name character varying(100)
);


ALTER TABLE public.players OWNER TO postgres;

--
-- TOC entry 4755 (class 2604 OID 17186)
-- Name: player_valuations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player_valuations ALTER COLUMN id SET DEFAULT nextval('public.player_valuations_id_seq'::regclass);


-- Completed on 2024-08-26 17:43:55

--
-- PostgreSQL database dump complete
--

